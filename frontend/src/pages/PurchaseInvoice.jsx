import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Truck, ShieldCheck, Send,
  FileText, Package, CheckCircle, RefreshCcw, Printer
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const S = {
  page: { padding: '3rem 2.5rem', maxWidth: '1400px', margin: '0 auto', paddingBottom: '8rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-color)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem' },
  card: { background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden' },
  sectionTitle: { fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' },
  th: { background: 'rgba(0,0,0,0.01)', padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1.5px solid var(--border-color)' },
  td: { padding: '1.5rem 1.5rem', fontSize: '14px', borderBottom: '1.5px solid var(--border-color)', verticalAlign: 'middle' },
  summaryCard: { background: 'var(--bg-nav)', borderRadius: '32px', padding: '2.5rem', color: '#fff', position: 'sticky', top: '2.5rem' },
};

function tomorrowDateString() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const PurchaseInvoice = () => {
  const { authFetch } = useAuth();
  const { addNotification } = useNotification();

  const [vendors, setVendors] = useState([]);
  const [parts, setParts] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [vendorId, setVendorId] = useState('');
  const [expectedDate, setExpectedDate] = useState(tomorrowDateString());
  const [draftId, setDraftId] = useState(null);
  const [sessionCode, setSessionCode] = useState('');
  const [status, setStatus] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [newPartId, setNewPartId] = useState('');
  const [newVolume, setNewVolume] = useState('1');
  const [newUnitCost, setNewUnitCost] = useState('');

  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMeta, setSuccessMeta] = useState({ sessionCode: '', units: 0 });

  const vendorName = vendors.find((v) => v.id === Number(vendorId))?.name || '';

  const loadVendorsAndParts = useCallback(async () => {
    try {
      const [vRes, pRes] = await Promise.all([
        authFetch('/api/vendors/dropdown'),
        authFetch('/api/parts'),
      ]);
      const vJson = await vRes.json();
      const pJson = await pRes.json();
      if (vRes.ok && Array.isArray(vJson.data)) {
        setVendors(vJson.data);
        setVendorId((prev) => {
          if (prev) return prev;
          return vJson.data.length ? String(vJson.data[0].id) : prev;
        });
      }
      if (pRes.ok && Array.isArray(pJson.data)) setParts(pJson.data);
    } catch {
      addNotification('Error', 'Failed to load vendors or parts.', 'error');
    }
  }, [authFetch, addNotification]);

  const loadInvoiceList = useCallback(async () => {
    try {
      const res = await authFetch('/api/purchase-invoices');
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) setInvoiceList(json.data);
    } catch {
      /* ignore */
    }
  }, [authFetch]);

  const loadDraftDetail = useCallback(async (id) => {
    if (!id) return;
    const res = await authFetch(`/api/purchase-invoices/${id}`);
    const json = await res.json();
    if (!res.ok || !json.data) return;
    const d = json.data;
    setSessionCode(d.sessionCode || '');
    setStatus(d.status || '');
    setLineItems(Array.isArray(d.lineItems) ? d.lineItems : []);
    setTotalAmount(Number(d.totalAmount) || 0);
  }, [authFetch]);

  useEffect(() => {
    (async () => {
      setListLoading(true);
      setError(null);
      await loadVendorsAndParts();
      await loadInvoiceList();
      setListLoading(false);
    })();
  }, [loadVendorsAndParts, loadInvoiceList]);

  useEffect(() => {
    if (draftId) loadDraftDetail(draftId);
  }, [draftId, loadDraftDetail]);

  const startDraft = async () => {
    if (!vendorId) {
      addNotification('Error', 'Select a vendor.', 'error');
      return;
    }
    setActionLoading(true);
    setError(null);
    try {
      const body = {
        vendorId: Number(vendorId),
        expectedIntakeDate: `${expectedDate}T12:00:00.000Z`,
        lineItems: [],
      };
      const res = await authFetch('/api/purchase-invoices', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.message || json.detail || 'Could not create draft.';
        setError(msg);
        addNotification('Error', msg, 'error');
        setActionLoading(false);
        return;
      }
      const id = json.data;
      setDraftId(id);
      addNotification('Success', 'Draft invoice created. Add line items, then finalize.');
      await loadInvoiceList();
    } catch {
      setError('Network error.');
      addNotification('Error', 'Create failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const addLineItem = async () => {
    if (!draftId) return;
    const part = parts.find((p) => p.id === Number(newPartId));
    if (!part) {
      addNotification('Error', 'Select a part.', 'error');
      return;
    }
    const vol = Number(newVolume);
    const cost = newUnitCost === '' ? Number(part.price) : Number(newUnitCost);
    if (!(vol > 0) || !(cost > 0)) {
      addNotification('Error', 'Volume and unit cost must be greater than zero.', 'error');
      return;
    }
    setActionLoading(true);
    try {
      const res = await authFetch(`/api/purchase-invoices/${draftId}/line-items`, {
        method: 'POST',
        body: JSON.stringify({
          partId: part.id,
          componentName: part.name,
          vendorName: vendorName || 'Vendor',
          volume: vol,
          unitCost: cost,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        addNotification('Error', json.message || json.detail || 'Add line failed.', 'error');
        setActionLoading(false);
        return;
      }
      setNewPartId('');
      setNewVolume('1');
      setNewUnitCost('');
      await loadDraftDetail(draftId);
      await loadInvoiceList();
      addNotification('Success', 'Line item added.');
    } catch {
      addNotification('Error', 'Add line failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const removeLineItem = async (lineId) => {
    if (!draftId) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`/api/purchase-invoices/${draftId}/line-items/${lineId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) {
        addNotification('Error', json.message || json.detail || 'Remove failed.', 'error');
        setActionLoading(false);
        return;
      }
      await loadDraftDetail(draftId);
      await loadInvoiceList();
    } catch {
      addNotification('Error', 'Remove failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const syncLowStock = async () => {
    if (!draftId) return;
    setActionLoading(true);
    try {
      const res = await authFetch(`/api/purchase-invoices/${draftId}/sync-low-stock`, { method: 'POST' });
      const json = await res.json();
      if (res.ok) {
        await loadDraftDetail(draftId);
        addNotification('Success', `Low-stock flags updated (${json.data ?? 0} lines).`);
      } else {
        addNotification('Error', json.message || 'Sync failed.', 'error');
      }
    } catch {
      addNotification('Error', 'Sync failed.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleFinalize = async () => {
    if (!draftId) return;
    setFinalizeLoading(true);
    setError(null);
    try {
      const res = await authFetch(`/api/purchase-invoices/${draftId}/finalize`, { method: 'PUT' });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.message || json.detail || 'Finalize failed.';
        setError(msg);
        addNotification('Error', msg, 'error');
        setFinalizeLoading(false);
        return;
      }
      const units = lineItems.reduce((a, b) => a + (Number(b.volume) || 0), 0);
      setSuccessMeta({ sessionCode: sessionCode || '—', units });
      setIsSuccess(true);
      addNotification('Success', 'Purchase invoice finalized. Stock updated.', 'Inventory');
      setDraftId(null);
      setSessionCode('');
      setLineItems([]);
      setTotalAmount(0);
      setStatus('');
      await loadInvoiceList();
      await loadVendorsAndParts();
    } catch {
      addNotification('Error', 'Finalize failed.', 'error');
    } finally {
      setFinalizeLoading(false);
    }
  };

  const newSession = () => {
    setIsSuccess(false);
    setDraftId(null);
    setSessionCode('');
    setLineItems([]);
    setTotalAmount(0);
    setStatus('');
    loadInvoiceList();
  };

  const onPartChange = (idStr) => {
    setNewPartId(idStr);
    const p = parts.find((x) => x.id === Number(idStr));
    if (p) setNewUnitCost(String(p.price));
  };

  const total = lineItems.reduce((acc, curr) => acc + (Number(curr.totalCost) || 0), 0) || totalAmount;

  return (
    <div style={S.page} className="page-transition">
      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="icon-circle">
              <CheckCircle size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Manifest finalized</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Session <strong>{successMeta.sessionCode}</strong> is locked. Stock increased by <strong>{successMeta.units}</strong> units (from line items).
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsSuccess(false)}><Printer size={18} /> Close</button>
              <button type="button" className="btn btn-primary" onClick={newSession}><RefreshCcw size={18} /> New session</button>
            </div>
          </div>
        </div>
      )}

      <div style={S.header}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
            <FileText size={16} /> Asset Procurement Portal
          </div>
          <h1 style={{ fontSize: '2.8rem', margin: 0 }}>Purchase <span style={{ color: 'var(--primary)' }}>Manifest</span></h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '15px' }}>Create draft, add lines, finalize (updates inventory).</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" className="btn btn-primary" onClick={handleFinalize} disabled={!draftId || finalizeLoading || status === 'Finalized'}>
            {finalizeLoading ? 'Finalizing…' : <><Send size={18} /> Finalize session</>}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#b91c1c' }}>
          {error}
        </div>
      )}

      {listLoading ? <p>Loading…</p> : null}

      <div style={S.layout}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={S.card}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={S.sectionTitle}>
                <Truck size={20} color="var(--primary)" /> Vendor & draft
              </h3>
              {draftId ? (
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)' }}>SESSION: {sessionCode || `#${draftId}`}</span>
              ) : null}
            </div>

            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Vendor</label>
                <select className="input" style={{ appearance: 'auto' }} value={vendorId} onChange={(e) => setVendorId(e.target.value)} disabled={!!draftId}>
                  <option value="">Select vendor…</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>Expected intake</label>
                <input type="date" className="input" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} disabled={!!draftId} />
              </div>
            </div>
            <div style={{ padding: '0 2rem 2rem' }}>
              {!draftId ? (
                <button type="button" className="btn btn-primary" onClick={startDraft} disabled={actionLoading}>
                  {actionLoading ? 'Creating…' : 'Start procurement draft'}
                </button>
              ) : (
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Draft <strong>#{draftId}</strong> · Status: <strong>{status}</strong></p>
              )}
            </div>
          </div>

          <div style={S.card}>
            <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.01)', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={S.sectionTitle}>
                <Package size={20} color="var(--primary)" /> Line items
              </h3>
              <button type="button" style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 800, color: 'var(--primary)', cursor: 'pointer' }} onClick={syncLowStock} disabled={!draftId || actionLoading}>
                SYNC LOW STOCK
              </button>
            </div>

            {draftId && status !== 'Finalized' ? (
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Part</label>
                  <select className="input" value={newPartId} onChange={(e) => onPartChange(e.target.value)}>
                    <option value="">Select part…</option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>{p.sku} — {p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Qty</label>
                  <input className="input" type="number" min="1" value={newVolume} onChange={(e) => setNewVolume(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Unit cost</label>
                  <input className="input" type="number" min="0" step="0.01" value={newUnitCost} onChange={(e) => setNewUnitCost(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={addLineItem} disabled={actionLoading}>Add</button>
              </div>
            ) : null}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Component</th>
                  <th style={{ ...S.th, width: '100px' }}>Qty</th>
                  <th style={S.th}>Unit</th>
                  <th style={{ ...S.th, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ ...S.td, textAlign: 'center', color: 'var(--text-muted)' }}>
                      {draftId ? 'No lines yet. Add items above.' : 'Start a draft to add line items.'}
                    </td>
                  </tr>
                ) : (
                  lineItems.map((item) => (
                    <tr key={item.id}>
                      <td style={S.td}>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{item.componentName}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>{item.vendorName}</div>
                      </td>
                      <td style={S.td}>{item.volume}</td>
                      <td style={S.td}>Rs. {Number(item.unitCost).toLocaleString()}</td>
                      <td style={{ ...S.td, textAlign: 'right' }}>
                        {status !== 'Finalized' ? (
                          <button type="button" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => removeLineItem(item.id)} disabled={actionLoading}>
                            <Trash2 size={20} />
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={S.card}>
            <div style={{ padding: '1rem 1.5rem', fontWeight: 800, fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recent invoices</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={S.th}>Session</th>
                  <th style={S.th}>Vendor</th>
                  <th style={S.th}>Status</th>
                  <th style={S.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceList.slice(0, 8).map((inv) => (
                  <tr key={inv.id}>
                    <td style={S.td}>{inv.sessionCode}</td>
                    <td style={S.td}>{inv.vendorName}</td>
                    <td style={S.td}>{inv.status}</td>
                    <td style={S.td}>Rs. {Number(inv.totalAmount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside>
          <div style={S.summaryCard}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} /> Summary
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, marginBottom: '10px' }}>Manifest total</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>Rs. {Number(total).toLocaleString()}</h2>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>Lines</span>
                <span style={{ fontSize: '14px', fontWeight: 800 }}>{lineItems.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 800, textTransform: 'uppercase' }}>Status</span>
                <span style={{ fontSize: '10px', fontWeight: 800, background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '6px 12px', borderRadius: '8px' }}>{status || '—'}</span>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleFinalize} style={{ width: '100%', padding: '16px', fontSize: '14px', marginTop: '1rem', background: '#fff', color: 'var(--bg-nav)' }} disabled={!draftId || finalizeLoading || status === 'Finalized'}>
                {finalizeLoading ? 'Processing…' : <><CheckCircle size={20} /> Finalize procurement</>}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PurchaseInvoice;

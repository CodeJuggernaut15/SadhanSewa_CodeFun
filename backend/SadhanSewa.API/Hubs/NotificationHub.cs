using Microsoft.AspNetCore.SignalR;

namespace SadhanSewa.API.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string title, string message, string category)
        {
            await Clients.All.SendAsync("ReceiveNotification", title, message, category);
        }
    }
}

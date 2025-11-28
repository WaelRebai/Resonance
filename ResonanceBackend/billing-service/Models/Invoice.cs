namespace BillingService.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
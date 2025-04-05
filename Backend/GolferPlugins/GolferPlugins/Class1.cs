using Microsoft.Xrm.Sdk;
using System;
using System.Text.Json;

public class GetGolfersPlugin : IPlugin
{
    public void Execute(IServiceProvider serviceProvider)
    {
        var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
        var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

        var golfers = new[]
        {
            new { id = "1", firstName = "Rory", lastName = "McIlroy", nationality = "Northern Ireland" },
            new { id = "2", firstName = "Scottie", lastName = "Scheffler", nationality = "USA" },
            new { id = "3", firstName = "Jon", lastName = "Rahm", nationality = "Spain" },
        };

        var json = JsonSerializer.Serialize(golfers);
        context.OutputParameters["GolferJson"] = json;
    }
}

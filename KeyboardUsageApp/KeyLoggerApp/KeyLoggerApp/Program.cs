using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Diagnostics;

namespace KeyLoggerApp
{
    public static class Program
    {
        public static ConcurrentDictionary<char, long> keyLogDict = new ConcurrentDictionary<char, long>();

        public static void Main(string[] args)
        {
            Serialization.DeSerializeKeyLogDict();

            for (int i = 1; i <= 26; i++)           
                keyLogDict.TryAdd((Char)(64 + i), 0);
            
            Parallel.Invoke(
            () =>
                KeyLogger.Init(),
            () =>
                CreateHostBuilder(args).Build().Run()
            );
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

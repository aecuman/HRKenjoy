using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(KenjoyHR.Startup))]
namespace KenjoyHR
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

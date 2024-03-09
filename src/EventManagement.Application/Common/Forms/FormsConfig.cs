//using EventManagement.Domain.Entities.Form.FormField;
//using Microsoft.Extensions.DependencyInjection;

//namespace EventManagement.Application.Common.Forms;

//internal static class FormsConfig
//{
//    public static void AddForms(this IServiceCollection services)
//    {
//        RegisterFormFieldTypes(services);
//    }

//    private static void RegisterFormFieldTypes(this IServiceCollection services)
//    {
//        void Register<TField>() where TField : FormField
//        {
//            services.AddSingleton<FormField, TField>();
//        }

//        Register<ShortTextFormField>();
//        Register<LongTextFormField>();
//        Register<SingleOptionFormField>();
//        Register<MultipleOptionsFormField>();
//    }
//}

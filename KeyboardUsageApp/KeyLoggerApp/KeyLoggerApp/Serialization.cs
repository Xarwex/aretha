using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using System.IO;
using System.Collections.Concurrent;
using System.Diagnostics;

namespace KeyLoggerApp
{
    public static class Serialization
    {
        static string keyLogFilePath = "keylogs.xml";
        static void SerializeObject<T>(T serializableObject, string fileName)
        {
            if (serializableObject == null) { return; }

            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                XmlSerializer serializer = new XmlSerializer(serializableObject.GetType());
                using (MemoryStream stream = new MemoryStream())
                {
                    serializer.Serialize(stream, serializableObject);
                    stream.Position = 0;
                    xmlDocument.Load(stream);
                    xmlDocument.Save(fileName);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }

        static T DeSerializeObject<T>(string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) { return default(T); }

            T objectOut = default(T);

            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(fileName);
                string xmlString = xmlDocument.OuterXml;

                using (StringReader read = new StringReader(xmlString))
                {
                    Type outType = typeof(T);

                    XmlSerializer serializer = new XmlSerializer(outType);
                    using (XmlReader reader = new XmlTextReader(read))
                    {
                        objectOut = (T)serializer.Deserialize(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return objectOut;
        }

        public static void SerializeKeyLogDict()
        {
            long[] arr = new long[26];

            for (int i = 0; i < 26; i++)
                arr[i] = Program.keyLogDict[(char)(i + 65)];

            SerializeObject(arr, keyLogFilePath);
        }

        public static void DeSerializeKeyLogDict()
        {
            long[] arr = DeSerializeObject<long[]>(keyLogFilePath);
            if (arr == null)
            {
                for (int i = 0; i < 26; i++)
                    Program.keyLogDict.TryAdd((char)(i + 65), 0);
            }
            else
                for (int i = 0; i < 26; i++)
                    Program.keyLogDict.TryAdd((char)(i + 65), arr[i]);
        }
    }
}

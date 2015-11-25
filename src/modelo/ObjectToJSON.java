package modelo;
import java.util.ArrayList;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;

public class ObjectToJSON {
	public static String convertToJSON(ArrayList<Object> lista){ 
		Gson gson = new Gson();
		String json = "";
		for(Object each : lista){
			// Converte Objetos Java para JSON
			json = json + gson.toJson(each);
		}
		return json;
	}
	
	//Pegando Tudo
	public static String requestJson(HttpServletRequest request) {
        StringBuffer sb = new StringBuffer();
        try {
            BufferedReader reader = request.getReader();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sb.toString();
    }
}
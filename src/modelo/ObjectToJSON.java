package modelo;
import java.util.ArrayList;

import com.google.gson.Gson;

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
}
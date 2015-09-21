package modelo;
import com.google.gson.Gson;

public class ObjectToJSON {
	public static String convertToJSON(Object objeto){ 
		Gson gson = new Gson();
		// Converte Objetos Java para JSON
		String json = gson.toJson(objeto);
		return json;
	}
}
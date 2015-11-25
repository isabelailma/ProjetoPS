package controle;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import modelo.DataBase;
import modelo.Ingredientes;
import modelo.ObjectToJSON;
import modelo.ValidarInformacao;

@WebServlet("/edit")
public class ServletEdit extends HttpServlet {
	
	private final static int DELAY = 1000;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			Thread.sleep(DELAY);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		String json = ObjectToJSON.requestJson(request);

		if (ValidarInformacao.validar(json)) {
			System.out.println(json);
			Ingredientes temp = new Gson().fromJson(json, Ingredientes.class);
			Integer id = temp.getId();
			Ingredientes toEditIngrediente = DataBase.getInstance().searchIngredientes(id);

			if (!json.getClass().getName().equals(toEditIngrediente.getNome())) {
				toEditIngrediente.setNome(temp.getNome());
				DataBase.getInstance().updateIngrediente(toEditIngrediente);
			}
			Callback.onSuccess(response, new Gson().toJson(toEditIngrediente));
		} else {
			Callback.onError(response);
		}
	}
}
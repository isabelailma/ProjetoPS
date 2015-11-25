package controle;

import modelo.DataBase;
import modelo.GerarID;
import modelo.Ingredientes;
import modelo.ObjectToJSON;
import modelo.ValidarInformacao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/new")
public class ServletNew extends HttpServlet {

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

			Ingredientes toAdd = new Gson().fromJson(json, Ingredientes.class);
			String nome = toAdd.getNome();
			if (nome != null && !nome.isEmpty()) {
				toAdd.setCreation(new SimpleDateFormat("dd/M/yyyy hh:mm:ss").format(new Date()));
				toAdd.setId(GerarID.gerarID());
				DataBase.getInstance().addIngredientes(toAdd);
				String answerToPage = new Gson().toJson(toAdd);
				response.getWriter().write(answerToPage);
			} else {
				response.getWriter().write("{\"nome\": \"Campo Obrigatorio\"}");
				response.setStatus(400);
			}
		}

	}
}
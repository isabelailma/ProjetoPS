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

@WebServlet("/delete")
public class ServletDelete extends HttpServlet {
	
	private final static int DELAY = 1000;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {Thread.sleep(DELAY);} catch (InterruptedException e) {e.printStackTrace();}
        String json = ObjectToJSON.requestJson(request);
        Integer id = new Gson().fromJson(json, Ingredientes.class).getId();
        
        if (ValidarInformacao.validar(id)) {
            /*Removendo do Servidor*/
            DataBase.getInstance().removeIngredientes(id);
            Callback.onSuccess(response);
        } else {
        	Callback.onError(response);
        }
    }

    protected void errorResponse(HttpServletResponse response, String json) throws IOException {
        response.getWriter().write(json);
        response.setStatus(400);
    }
}
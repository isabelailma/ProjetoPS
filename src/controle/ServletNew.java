package controle;

import modelo.DataBase;
import modelo.Ingredientes;
import modelo.ValidarInformacao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import java.io.IOException;

@WebServlet("/new")
public class ServletNew extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static int DELAY = 1000;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {Thread.sleep(DELAY);} catch (InterruptedException e) {e.printStackTrace();}
        String toAddNome = request.getParameter("nome");
        if(ValidarInformacao.validar(toAddNome)){
            Ingredientes toAdd = new Ingredientes(toAddNome);
            DataBase.getInstance().addIngredientes(toAdd);
            String answerToPage = new Gson().toJson(toAdd);
            response.getWriter().write(answerToPage);
        }else{
            response.getWriter().write("{\"nome\": \"Campo Obrigatorio\"}");
            response.setStatus(400);
        }
    }

}
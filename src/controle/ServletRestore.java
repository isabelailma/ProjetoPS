package controle;

import modelo.DataBase;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import java.io.IOException;

@WebServlet("/rest")
public class ServletRestore extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static int DELAY = 2000;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {Thread.sleep(DELAY);} catch (InterruptedException e) {e.printStackTrace();}
        String json = new Gson().toJson(DataBase.getInstance().getListaIngredientes());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}
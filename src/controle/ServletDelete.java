package controle;

import modelo.DataBase;
import modelo.ValidarInformacao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/delete")
public class ServletDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static int DELAY = 1000;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {Thread.sleep(DELAY);} catch (InterruptedException e) {e.printStackTrace();}
        String requestId = request.getParameter("id");
        if (ValidarInformacao.validarNumber(requestId)) {
            Integer id = Integer.parseInt(requestId);
            /*Removendo do Servidor*/
            DataBase.getInstance().removeIngredientes(id);;
            String json = "{ \"success\": true }";
            response.getWriter().write(json);

        } else {
            errorResponse(response, "{\"nome\": \"Error to get Id\"}");
        }
    }

    protected void errorResponse(HttpServletResponse response, String json) throws IOException {
        response.getWriter().write(json);
        response.setStatus(400);
    }
}
package controle;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class Callback {
    public static void onSuccess(HttpServletResponse response, String json) {
        try {
            response.getWriter().write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void onSuccess(HttpServletResponse response) {
        String success = "{ \"success\": true }";
        try {
            response.getWriter().write(success);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void onError(HttpServletResponse response) {
        String error = "{\"nome\": \"Campo Obrigatório\"}";
        try {
            response.getWriter().write(error);
            response.setStatus(400);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void onError(HttpServletResponse response, String error) {
        try {
            response.getWriter().write(error);
            response.setStatus(400);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
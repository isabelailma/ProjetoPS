package modelo;

import java.util.List;

public class ValidarInformacao {
    public static boolean validar(String parameter) {
        if (parameter != null && !parameter.isEmpty() && parameter != "{}") {
            return true;
        }
        return false;
    }

    public static boolean validar(List<String> parameters) {
        boolean result = true;
        for (String list : parameters) {
            result = result && (validar(list));
        }
        return result;
    }

    public static boolean validar(Object parameter) {
        if (parameter != null) {
            return true;
        }
        return false;
    }

    public static boolean validarNumber(String number) {
        boolean result = false;
        if (validar(number)) {
            try {
                Integer n = Integer.parseInt(number);
                result = true;
            } catch (Exception e) {
            }
        }
        return result;
    }
}
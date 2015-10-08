package modelo;

import java.util.Arrays;
import java.util.List;

public class Rest {
    public static List<Ingredientes> getIngredientes() {
        List<Ingredientes> itens = Arrays.asList(
                new Ingredientes("Arroz"),
                new Ingredientes("Feijão"),
                new Ingredientes("Açucar"),
                new Ingredientes("Sal")
        );
        return itens;
    }
}
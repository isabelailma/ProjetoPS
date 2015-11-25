package modelo;

import java.util.ArrayList;
import java.util.List;

public class DataBase {
    private static DataBase ourInstance = new DataBase();
    private List<Ingredientes> listaIngredientes;

    public static DataBase getInstance() {
        return ourInstance;
    }

    private DataBase() {
        listaIngredientes = new ArrayList<>();
        /*Dados de Banco Fake*/
        listaIngredientes.addAll(Rest.getIngredientes());
    }

    public void addIngredientes(Ingredientes ingrediente) {
        if (ingrediente != null)
            listaIngredientes.add(ingrediente);
    }
    
    public void addIngredientes(Integer id, String nome) {
        listaIngredientes.add(new Ingredientes( id, nome));
    }

    public void removeIngredientes(Ingredientes Ingredientes) {
        if (Ingredientes != null)
            listaIngredientes.remove(Ingredientes);
    }

    public void removeIngredientes(Integer id) {
        Ingredientes Ingredientes = searchIngredientes(id);
        if (Ingredientes != null) {
            listaIngredientes.remove(Ingredientes);
        }
    }

    public Ingredientes searchIngredientes(Integer id) {
        Ingredientes result = null;
        for (Ingredientes Ingredientes : listaIngredientes) {
            if (((modelo.Ingredientes) Ingredientes).getId().equals(id)) {
                result = (modelo.Ingredientes) Ingredientes;
            }
        }
        return result;
    }

    public List<Ingredientes> searchIngredientes(String nome) {
        List<Ingredientes> result = new ArrayList<>();
        for (Ingredientes Ingredientes : listaIngredientes) {
            if (((modelo.Ingredientes) Ingredientes).getNome().equals(nome)) {
                result.add(Ingredientes);
            }
        }
        return result;
    }

    public List<Ingredientes> getListaIngredientes() {
        return listaIngredientes;
    }

    public int getListaIngredientesSize(){return listaIngredientes.size();}
    
    public void updateIngrediente(Ingredientes ingrediente) {
        for (int i = 0; i < listaIngredientes.size(); i++) {
            if (listaIngredientes.get(i).getId().equals(ingrediente.getId())) {
            	listaIngredientes.set(i, ingrediente);
            }
        }
    }   
}
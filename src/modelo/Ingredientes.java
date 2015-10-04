package modelo;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Ingredientes {

	// Variávei de Ambiente
	private Integer id;
	private String nome;
	private String creation;
	
	// Construtor
	public Ingredientes(Integer id, String nome) {
		this.id = id;
		this.nome = nome;
		this.creation = new SimpleDateFormat("dd/M/yyyy hh:mm:ss").format(new Date());
	}
	
	// Getters and Setters
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCreation() {
		return creation;
	}
	public void setCreation(String creation) {
		this.creation = creation;
	}	
}
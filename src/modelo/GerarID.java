package modelo;

public class GerarID {
	
	private static Integer id = 000000;
	
	public static Integer gerarID(){
		id += 1;
		return id;
	}
}
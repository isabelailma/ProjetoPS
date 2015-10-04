<%@page import="java.util.ArrayList"%>
<%@page import="modelo.ObjectToJSON"%>
<%@page import="modelo.Ingredientes"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<jsp:scriptlet>
	
		ArrayList listaIngredientes = new ArrayList();
		listaIngredientes.add(new Ingredientes(000001, "Arroz"));
		listaIngredientes.add(new Ingredientes(000002, "Feijão"));
		listaIngredientes.add(new Ingredientes(000003, "Açucar"));
		listaIngredientes.add(new Ingredientes(000004, "Sal"));
		
		String json = ObjectToJSON.convertToJSON(listaIngredientes);
	</jsp:scriptlet>
	<jsp:expression>
		
		json
	
	</jsp:expression>
	
</body>
</html>
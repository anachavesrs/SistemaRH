namespace RHSystem_webapi
{
	class Turno
    {
    	public int id { get; set; }
		public string? turno { get; set; }
         public List<Funcionario> funcionarios {get; set;}

    }
}
package com.co.user.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * Entidad que representa un Usuario con sus atributos
 * @author Fabian Torres
 */

@Entity
@Table(name="usuario")
public class User implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3686944477887792925L;

	@Id
	@Column(name="uid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long uid;
	
	@Column(name="usuario", nullable=false, length = 50)
	private String usuario;
	
	@Column(name="nombre", nullable=false, length = 100)
	private String nombre;
	
	@Column(name="apellido", nullable=false, length = 100)
	private String apellido;
	
	@Column(name="edad", nullable=false, length = 2)
	private Byte edad;
	
	@Column(name="sexo", nullable=false)
	private Character sexo;
	
	@Column(name="descripcion", nullable=false)
	private String descripcion;
	
	@Column(name="esadministrador")
	private Boolean esadministrador;
	
	@Column(name="nacionalidad", nullable=false)
	private Character nacionalidad;
	
	@Column(name="fechanacimiento", nullable=false)
	private Date fechanacimiento;
	
	@Column(name="aficiones", nullable=false)
	private String aficiones;
	
	/*
	@Column(name = "fecharegistro")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date fecharegistro;
	
	@Column(name = "fechamodificacion")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date fechamodificacion;
	*/
	
	/**
	 * Constructor vacio
	 */
	public User() {
		
	}


	public User(Long uid, String usuario, String nombre, String apellido, Byte edad, Character sexo, String descripcion,
			Boolean esadministrador, Character nacionalidad, Date fechanacimiento, String aficiones /*, Date fecharegistro,
			Date fechamodificacion*/) {
		super();
		this.uid = uid;
		this.usuario = usuario;
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.sexo = sexo;
		this.descripcion = descripcion;
		this.esadministrador = esadministrador;
		this.nacionalidad = nacionalidad;
		this.fechanacimiento = fechanacimiento;
		this.aficiones = aficiones;
		// this.fecharegistro = fecharegistro;
		// this.fechamodificacion = fechamodificacion;
	}


	public Long getUid() {
		return uid;
	}


	public void setUid(Long uid) {
		this.uid = uid;
	}


	public String getUsuario() {
		return usuario;
	}


	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getApellido() {
		return apellido;
	}


	public void setApellido(String apellido) {
		this.apellido = apellido;
	}


	public Byte getEdad() {
		return edad;
	}


	public void setEdad(Byte edad) {
		this.edad = edad;
	}


	public Character getSexo() {
		return sexo;
	}


	public void setSexo(Character sexo) {
		this.sexo = sexo;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public Boolean getEsadministrador() {
		return esadministrador;
	}


	public void setEsadministrador(Boolean esadministrador) {
		this.esadministrador = esadministrador;
	}


	public Character getNacionalidad() {
		return nacionalidad;
	}


	public void setNacionalidad(Character nacionalidad) {
		this.nacionalidad = nacionalidad;
	}


	public Date getFechanacimiento() {
		return fechanacimiento;
	}


	public void setFechanacimiento(Date fechanacimiento) {
		this.fechanacimiento = fechanacimiento;
	}


	public String getAficiones() {
		return aficiones;
	}


	public void setAficiones(String aficiones) {
		this.aficiones = aficiones;
	}


	/*
	public Date getFecharegistro() {
		return fecharegistro;
	}


	public void setFecharegistro(Date fecharegistro) {
		this.fecharegistro = fecharegistro;
	}


	public Date getFechamodificacion() {
		return fechamodificacion;
	}


	public void setFechamodificacion(Date fechamodificacion) {
		this.fechamodificacion = fechamodificacion;
	}
	*/


}
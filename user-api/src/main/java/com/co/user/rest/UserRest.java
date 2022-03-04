package com.co.user.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.co.user.daos.UserDAO;
import com.co.user.entities.User;

@RestController
@RequestMapping("admin/users/v1")
// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserRest {

	@Autowired
	private UserDAO userDAO;
	
	/**
	 * Servicio para consultar una lista de Usuarios
	 * Operation GET =>[ http://localhost:${port}/usuarios ]
	 * @return Una lista de usuarios
	 */
	
	@GetMapping
	public ResponseEntity<List<User>> getListOfUsers() {
				
		List<User> users = userDAO.findAll();
		return ResponseEntity.ok(users);
		
	}
	
	/**
	 * Servicio para consultar una lista de Usuarios con paginaci�n
	 * Operation GET =>[ http://localhost:${port}/usuarios ]
	 * @return Una lista de usuarios paginados
	 */
	@RequestMapping(value="paginate/{page}-{size}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> getListOfUsersPaginated(
			@PathVariable("page") int page, 
			@PathVariable("size") int size) {		
		int actualPage = page-1;		
		// System.out.println("PAGE: " + actualPage);
		// System.out.println("SIZE: " + size);
		
		// Ordenamiento
		Sort sort = Sort.by(Sort.Direction.ASC, "userId");
		
		// Paginación Empieza desde 0 		
		Pageable pageable = PageRequest.of( actualPage, size, sort );
		// System.out.println("getPageNumber: " + pageable.getPageNumber());
		// System.out.println("getPageSize: " + pageable.getPageSize());
		// System.out.println("getOffset: " + pageable.getOffset());
		
		// Consulta de paginación
		Page<User> userPage = userDAO.findAll(pageable);
		return ResponseEntity.ok( userPage.getContent() );
	}
	
	/**
	 * Servicio para obtener el total de Usuarios
	 * Operation GET =>[ http://localhost:${port}/users/total ]
	 * @return El total de Usuarios registrados
	 */
	@RequestMapping(value="total", method = RequestMethod.GET)
	public ResponseEntity<Long> getTotalOfUsers() {				
		Long numberOfUsers = userDAO.count();
		return ResponseEntity.ok(numberOfUsers);		
	}
	
	
	/**
	 * Servicio para consultar un Usuario por su identificador
	 * Operation GET =>[ http://localhost:${port}/users/{idUsuario} ]
	 * @param userId Identificador �nico del usuario
	 * @return Un objeto Usuario si existe.
	 */
	@RequestMapping(value="{userId}") 
	public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId ) {
				
		Optional<User> optionalUser = userDAO.findById(userId);
		
		if( optionalUser.isPresent() ) {
			return ResponseEntity.ok(optionalUser.get());
		} else {
			return ResponseEntity.noContent().build();
		}
							
	}
	
	/**
	 * Servicio para crear un nuevo Usuario
	 * Operation POST => [ http://localhost:${port}/users/ ]
	 * @param user Un objeto de tipo User
	 * @return El nuevo objeto User creado.
	 */
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User newUser = userDAO.save(user);
		return ResponseEntity.ok(newUser);
	}
	
	/**
	 * Servicio para actualizar un Usuario
	 * Operation PUT => [ http://localhost:${port}/users/ ]
	 * @param user Un objeto de tipo User
	 * @return Un objeto del tipo ResponseEntity<User>
	 */	
	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		
		Optional<User> optionalUser = userDAO.findById( user.getUid() );
		
		if( optionalUser.isPresent() ) {
			
			User updateUser = optionalUser.get();
			
			// updateUser.setUserId( user.getUserId() );
			updateUser.setUsuario( user.getUsuario() );
			updateUser.setNombre( user.getNombre() );
			updateUser.setApellido( user.getApellido() );
			updateUser.setEdad( user.getEdad() );
			updateUser.setSexo( user.getSexo() );
			updateUser.setDescripcion( user.getDescripcion() );
			updateUser.setEsadministrador( user.getEsadministrador() );
			updateUser.setNacionalidad( user.getNacionalidad() );
			updateUser.setFechanacimiento( user.getFechanacimiento() );
			updateUser.setAficiones( user.getAficiones() );
			
			userDAO.save(updateUser);
			
			return ResponseEntity.ok(updateUser);
			
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	
		
	/**
	 * Servicio para borrar un Usuario
	 * Operation DELETE => [ http://localhost:${port}/users/{userId} ]
	 * @param userId Identificador �nico del usuario
	 * @return Un resultado del tipo ResponseEntity<Boolean>
	 */
	@DeleteMapping(value="{userId}") 
	public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") Long userId) {
		
		Optional<User> optionalUser = userDAO.findById( userId );		
		
		// Se elimina �nicamente si el usuario existe.
		if( optionalUser.isPresent() ) {
			userDAO.deleteById( userId );
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.ok(false);
		}
				
	}	
	
}
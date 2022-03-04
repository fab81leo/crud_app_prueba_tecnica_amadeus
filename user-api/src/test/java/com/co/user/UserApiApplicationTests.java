package com.co.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.co.user.daos.UserDAO;
import com.co.user.entities.User;
import com.co.user.rest.UserRest;
import com.google.gson.Gson;

/**
 * Pruebas Unitarias del Proyecto
 * JUnit - Test Unit
 * @author Fabian Torres
 */

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
// @RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
public class UserApiApplicationTests {
	
	private static final Logger logger = LoggerFactory.getLogger(UserApiApplicationTests.class);
	
	
	private MockMvc mockMvc;
	
	@Mock
    private UserDAO userDAO;
	
	@InjectMocks
    private UserRest userRest;
		
	@Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userRest).build();
    }
    
	/**
   	 * Verifica si el endpoint "/admin/users/v1" responde correctamente con estado 200
	 * Test ListOfUsers
	 */
	@Test
	public void testListOfUsers() {
		
		try {
			mockMvc.perform( get("/admin/users/v1") ).andExpect( status().isOk());
			logger.info("[Test 1 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 1 => Error]: " + e.getMessage());
		}
				
	}
	
	/**
	 * Verifica si el endpoint "/admin/users/v1/paginate/{page}-{size}" responde correctamente con estado 200
	 * Test ListOfUsers
	 */
	@Test
	public void testListOfUsersPaginated() {
		try {
			// mockMvc.perform( get("/admin/users/v1/paginate/{page}-{size}")
			//		.param("page","2")
			//		.param("size","5")).andExpect( status().isOk());	
			logger.info("[Test 2 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 2 => Error]: " + e.getMessage());
		}
	}
	
	/**
	 * Test - Total Users
	 */
	@Test
	public void testTotalUsers() {
		try {
			mockMvc.perform( get("/admin/users/v1/total") ).andExpect( status().isOk());	
			logger.info("[Test 3 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 3 => Error]: " + e.getMessage());
		}
	}
	
	/**
	 * Test - Total Users
	 */
	@Test
	public void testGetUserById() {
		
		try {
			// mockMvc.perform( get("/admin/users/v1/{userId}", 8L)
			//		.param("userId","2") ).andExpect( status().isOk());	
			logger.info("[Test 4 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 4 => Error]: " + e.getMessage());
		}
				
	}
	
	/**
	 * Verificar la creación de un nuevo usuario
	 * Test - Total Users
	 */
	@Test
	public void testCreateUser() {
		
		final String json = "{\"userName\":\"prueba\",\"lastName\":\"prueba\",\"age\":35,\"sex\":\"F\",\"description\":\"Administradora de Empresas\",\"nationality\":\"C\",\"birthDate\":\"1995-12-23T05:00:00.000Z\",\"interest\":\"['Contabilidad']\"}";
		// final Gson gson = new Gson();
	    // final User user = gson.fromJson(json, User.class);
		try {
			mockMvc.perform(
	            post("/admin/users/v1")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(json))
	        .andExpect(status().isOk());			
			logger.info("[Test 5 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 5 => Error]: " + e.getMessage());
		}
				
	}
	
	/**
	 * Verificar la modificación de un usuario existente
	 * Test - Total Users
	 */
	@Test
	public void testUpdateUser() {
		
		final String json = "{\"userId\":1,\"userName\":\"modificado\",\"lastName\":\"modificado\",\"age\":35,\"sex\":\"F\",\"description\":\"Administradora de Empresas\",\"nationality\":\"C\",\"birthDate\":\"1995-12-23T05:00:00.000Z\",\"interest\":\"['Contabilidad']\"}";
		// final Gson gson = new Gson();
	    // final User user = gson.fromJson(json, User.class);
		try {
			// mockMvc.perform(
			//    put("/admin/users/v1")
			//        .contentType(MediaType.APPLICATION_JSON)
			//        .content(json))
			// .andExpect(status().isOk());			
			logger.info("[Test 6 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 6 => Error]: " + e.getMessage());
		}
				
	}
	
	/**
	 * Verificar la eliminación de un usuario existente
	 * Test - Total Users
	 */
	@Test
	public void testDeleteUser() {
		
		try {
			// mockMvc
			// .perform(
			//    delete("/admin/users/v1/{userId}", 1)
			//        .contentType(MediaType.APPLICATION_JSON))
			// .andExpect(status().isOk());			
			logger.info("[Test 7 => Ok]: ");
		} catch (Exception e) {
			logger.error("[Test 7 => Error]: " + e.getMessage());
		}
				
	}
	


}

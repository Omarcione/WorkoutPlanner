package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController	// This means that this class is a Controller
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {

	private final UserRepository userRepository;

	private final UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/sync")
	public ResponseEntity<String> syncUser(@RequestBody UserDTO userDTO) {
		userService.syncUser(userDTO);
		return ResponseEntity.ok("User synced successfully");
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/all")
	public List<User> getAllUsers() {
        return userService.getAllUsers();
	}
}

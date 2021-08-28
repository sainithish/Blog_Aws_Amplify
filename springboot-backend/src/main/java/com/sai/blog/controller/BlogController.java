package com.sai.blog.controller;

import java.util.*;

//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sai.blog.model.Blog;
import com.sai.blog.repository.BlogRepository;

@CrossOrigin( origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class BlogController {
	@Autowired
	private BlogRepository blogRepository;
	
	@GetMapping("/blogs")
	public List<Blog> getAllBlogs(){
		return blogRepository.findAll();
	}
	
	@PostMapping("/blogs")
	public Blog createBlog(@RequestBody Blog blog) {
		return blogRepository.save(blog);
	}
	@DeleteMapping("/blogs/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteBlog(@PathVariable Long id){
		Blog blog=blogRepository.findById(id)
				.orElseThrow();
		blogRepository.delete(blog);
		Map<String, Boolean> response = new HashMap<> ();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}
}

package in.umbrellaR1.GreenMist.dto;

import java.util.HashMap;
import java.util.Map;

public class CartResponse {
	private Long id;
	private Long userid;
	private Map<String,Integer> items = new HashMap<>();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public Map<String, Integer> getItems() {
		return items;
	}
	public void setItems(Map<String, Integer> items) {
		this.items = items;
	}

}

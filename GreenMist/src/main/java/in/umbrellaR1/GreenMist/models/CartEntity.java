package in.umbrellaR1.GreenMist.models;

import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Entity
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @ElementCollection
    @CollectionTable(name = "cart_items", joinColumns = @JoinColumn(name = "cart_id"))
    @Column(name = "quantity")
    private Map<Long, Integer> items = new HashMap<>();

    // ✅ Default constructor (required by JPA)
    public CartEntity() {}

    public CartEntity(Long userId, Map<Long, Integer> items) {
        this.userId = userId;
        this.items = items;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Map<Long, Integer> getItems() {
        return items;
    }

    public void setItems(Map<Long, Integer> items) {
        this.items = items;
    }

	/**
	 * @param id
	 * @param userId
	 * @param items
	 */
	public CartEntity(Long id, Long userId, Map<Long, Integer> items) {
		this.id = id;
		this.userId = userId;
		this.items = items;
	}
}

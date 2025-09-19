package in.umbrellaR1.GreenMist.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import in.umbrellaR1.GreenMist.models.CartEntity;


@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {
	
	Optional<CartEntity> findByUserId(Long userId);
	
	@Transactional
    @Modifying
	void deleteByUserId(Long userId);
	

}

package in.umbrellaR1.GreenMist.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.umbrellaR1.GreenMist.models.CartEntity;


@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {

}

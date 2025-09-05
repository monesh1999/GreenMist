package in.umbrellaR1.GreenMist.Repository;

//import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import in.umbrellaR1.GreenMist.models.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    // You can add custom queries here if needed
}

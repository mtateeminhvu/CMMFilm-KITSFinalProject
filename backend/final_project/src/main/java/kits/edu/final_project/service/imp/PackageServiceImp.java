package kits.edu.final_project.service.imp;

import kits.edu.final_project.entity.PackageEntity;
import kits.edu.final_project.repository.PackageRepository;
import kits.edu.final_project.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImp implements PackageService {
    @Autowired
    PackageRepository packageRepository;
    @Override
    public List<PackageEntity> getPackage() {
        return packageRepository.findAll();
//        return null;
    }

    @Override
    public PackageEntity replacePackage(int id, PackageEntity packageEntity) {
        return packageRepository.findById(id).map(p -> {
            p.setDuration(packageEntity.getDuration());
            p.setName(packageEntity.getName());
            p.setPrice(packageEntity.getPrice());
            return packageRepository.save(p);
        }).orElseGet(() -> {
            return packageRepository.save(packageEntity);
        });
//        return null;
    }

}

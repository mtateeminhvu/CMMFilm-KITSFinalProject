package kits.edu.final_project.service;

import kits.edu.final_project.entity.PackageEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PackageService {
    List<PackageEntity> getPackage();
    PackageEntity replacePackage(int id, PackageEntity packageEntity);
}

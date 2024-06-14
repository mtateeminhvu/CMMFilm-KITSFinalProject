package kits.edu.final_project.exception;

import kits.edu.final_project.payload.response.BaseResponse;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.ProviderNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class GlobalCustomException {
    @ExceptionHandler(CustomFileNotFoundException.class)
    public ResponseEntity<?> handlerFileNotFound(Exception e){

        BaseResponse response=new BaseResponse();
        response.setStatusCode(500);
        response.setData(e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handlerCustomException(Exception e){

        BaseResponse response=new BaseResponse();
        response.setStatusCode(500);
        response.setData(e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(ProviderNotFoundException.class)
    public ResponseEntity<?> handlerAuthException(Exception e){
        BaseResponse response=new BaseResponse();
        response.setStatusCode(403);
        response.setData(e.getMessage());
        response.setMessage("Not authorized, token failed");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<?> handlerSQLContranstException(Exception e){
        BaseResponse response=new BaseResponse();
        response.setStatusCode(500);
        response.setData(e.getMessage());
        response.setMessage("Not permit delete because this have data linked in page");
//        System.out.println("ok");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handlerKeyContranstException(Exception e){
        BaseResponse response=new BaseResponse();
        response.setStatusCode(500);
        response.setData(e.getMessage());
        response.setMessage("You just update datalinked");
//        System.out.println("ok");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

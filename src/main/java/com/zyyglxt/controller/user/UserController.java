package com.zyyglxt.controller.user;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.MobileUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:30
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    IUserService userService;

    /**
     * 用户注册，接收前段传递的数据，到service层
     *
     * @param userDO
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public Result Register(UserDO userDO) {
        Result result = userService.Register(userDO);
        if (result.getCode() == 200) {
            return Result.succ(200, result.getMsg(), null);
        } else {
            return Result.succ(404, result.getMsg(), null);
        }

    }

    /**
     * 用户登录，接收前段传递的数据，到service层
     *
     * @param userDto
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Result Login(UserDto userDto) {
        Result result = userService.Login(userDto.getUsername(), userDto.getPassword());
        if (result.getCode() == 200) {
            return Result.succ(200, result.getMsg(), null);
        } else {
            return Result.succ(404, result.getMsg(), null);
        }
    }

    /**
     * 用户登出
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public Result Logout() {
        Result result = userService.Logout();
        if (result.getCode() == 200){
            return Result.succ(200, result.getMsg(),null);
        } else {
            return Result.fail(404, result.getMsg(),null);
        }
    }

    /**
     * 根据电话号码来修改密码
     *
     * @param userDto
     */
    @RequestMapping(value = "upwd", method = RequestMethod.PUT)
    public Result UpdatePassword(UserDto userDto) {
        Result result = userService.UpdatePassword(userDto);
        if (result.getCode() == 200){
            return Result.succ(200, result.getMsg(), null);
        } else {
            return Result.succ(404, result.getMsg(), null);
        }
    }
}
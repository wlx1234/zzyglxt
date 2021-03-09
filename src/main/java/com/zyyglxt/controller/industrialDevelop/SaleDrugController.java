package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSaleDrugDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IndustrialDevelopSaleDrugService;
import com.zyyglxt.util.UsernameUtil;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/6 21:10
 * @Version 1.0
 **/
@Api(tags = "产业发展-销售企业、制药企业在售药品")
@RestController
@RequestMapping(value = "industrialdevelop")
public class SaleDrugController {

    @Resource
    IndustrialDevelopSaleDrugService saleDrugService;
    @Resource
    private IFileService iFileService;
    @Resource
    UsernameUtil usernameUtil;
    @ResponseBody
    @RequestMapping(value = "/sale-drug", method = RequestMethod.POST)
    @LogAnnotation(appCode ="",logTitle ="售药添加",logLevel ="3",creater ="",updater = "")
    public ResponseData addSaleDrug(@RequestBody IndustrialDevelopSaleDrug record) {
       int res= saleDrugService.insertSelective(record);
        if (res == -1){
            return new ResponseData(EmBusinessError.ORG_NAME_ERROR);
        }else {
            return new ResponseData(EmBusinessError.success);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/sale-drug", method = RequestMethod.PUT)
    @LogAnnotation(appCode ="",logTitle ="售药数据修改",logLevel ="2",creater ="",updater = "")
    public ResponseData updSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value ="/sale-drug",method = RequestMethod.DELETE )
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="售药数据删除",logLevel ="4",creater ="",updater = "")
    public ResponseData delSaleDrug(@RequestBody IndustrialDevelopSaleDrug record){
        saleDrugService.deleteByPrimaryKey(record.getItemid(),record.getItemcode());
        return new ResponseData(EmBusinessError.success);
    }

    /*售药数据所有查询*/
    @RequestMapping(value ="/sale-drug",method = RequestMethod.GET )
    @LogAnnotation(appCode ="",logTitle ="查寻所有售药数据",logLevel ="1")
    @ResponseBody
    public ResponseData selectAllSaleDrug(@RequestParam("status") String status){
        return new ResponseData(EmBusinessError.success,saleDrugService.selectAllSaleDrug(status));
    }
    // usernameUtil.getOrgCode()
    private IndustrialDevelopSaleDrugDto convertDtoFromDo(IndustrialDevelopSaleDrug industrialDevelopSaleDrug, String filePath){
        if(StringUtils.isEmpty(filePath)){
            filePath = "已经损坏了";
        }
        IndustrialDevelopSaleDrugDto industrialDevelopSaleDrugDto = new IndustrialDevelopSaleDrugDto();
        BeanUtils.copyProperties(industrialDevelopSaleDrug,industrialDevelopSaleDrugDto);
        industrialDevelopSaleDrugDto.setFilePath(filePath);
        return industrialDevelopSaleDrugDto;
    }

    /*药品数据的状态*/
    @RequestMapping(value = "changestatustosaledrug/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(logTitle = "药品数据状态的修改", logLevel = "2")
    public ResponseData changeStatusToSaleDrug(@RequestParam("status") String status, @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        IndustrialDevelopSaleDrug industrialDevelopSaleDrug=new IndustrialDevelopSaleDrug();
        industrialDevelopSaleDrug.setItemid(itemID);
        industrialDevelopSaleDrug.setItemcode(itemCode);
        saleDrugService.changeStatusToSaleDrug(industrialDevelopSaleDrug,status);
        return new ResponseData(EmBusinessError.success);
    }
}

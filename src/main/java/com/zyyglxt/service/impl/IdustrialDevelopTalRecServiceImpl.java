package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTalRecDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopCooExcDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IDictService;
import com.zyyglxt.service.IIndustrialDevelopTalRecService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 16:51
 * @Version 1.0
 **/
@Service
public class IdustrialDevelopTalRecServiceImpl implements IIndustrialDevelopTalRecService {
    @Resource
    IndustrialDevelopTalRecDOMapper developTalRecDOMapper;

    @Resource
    ValidatorImpl validator;

    @Resource
    UsernameUtil usernameUtil;
    @Override
    public void addTalRec(IndustrialDevelopTalRecDO record) {
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());

        developTalRecDOMapper.insertSelective(record);
    }

    @Override
    public void delTalRec(IndustrialDevelopTalRecDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developTalRecDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTalRec(IndustrialDevelopTalRecDO record) {
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(new Date());
        developTalRecDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<IndustrialDevelopTalRecDO> getTalRecs(String orgCode) {
        return developTalRecDOMapper.selectAll(orgCode);
    }
}

package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FamPreDOMapper;
import com.zyyglxt.dataobject.FamPreDO;
import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.service.FamPreDOService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/31 12:11
 */
@Service
public class FamPreDOServiceImpl implements FamPreDOService {
    @Resource
    FamPreDOMapper famPreDOMapper;
    @Override
    public int insertSelective(FamPreDO record) {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        famPreDOMapper.insertSelective(record);
        record.setItemcreateat(new Date());
        record.setCreater("");
        return 0;
    }

    @Override
    public int deleteByPrimaryKey(FamPreDOKey key) {
        famPreDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(FamPreDO record) {
        /*Date data=new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            data = df.parse(df.format(data));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        record.setItemcreateat(data);*/
        famPreDOMapper.updateByPrimaryKeySelective(record);
        record.setItemupdateat(new Date());
        record.setUpdater("");
        return 0;
    }

    @Override
    public FamPreDO selectByPrimaryKey(FamPreDOKey key) {
        return famPreDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<FamPreDO> selectAllFamPre() {
        return famPreDOMapper.selectAllFamPre();
    }
}

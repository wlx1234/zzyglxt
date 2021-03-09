package com.zyyglxt.service;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.BusinessException;

import java.sql.Date;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2020/10/29 10:17
 * @Version 1.0
 */
public interface IDataNewsService {
    //查询一个新闻信息
    DataDO selectNewsInf(DataDOKey key);

    //查询所有新闻信息
    List<DataDto> selectNewsInfList(String dataStatus);

    //查询所有新闻轮播图
    List<DataDto> selectNewsRotList(String dataStatus);

    //增加一个信息
    int insertNewsInf(DataDO record);

    //删除一个新闻信息
    int deleteNewsInf(DataDOKey key);

    //修改新闻信息
    int updateNewsInf(DataDO record);

    int changeStatus(DataDOKey key, String dataDelayedRelease, String dataStatus);

}

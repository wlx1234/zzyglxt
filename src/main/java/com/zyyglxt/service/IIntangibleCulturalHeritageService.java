package com.zyyglxt.service;

import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/10/29 10:45
 * Version: 1.0
 * 非物质文化遗产业务
 */
public interface IIntangibleCulturalHeritageService {
    //查询一个非物质文化遗产
    ChineseCulturalDO getIntangibleCulturalHeritage(ChineseCulturalDOKey key);

    //查询所有非物质文化遗产
    List<ChineseCulturalDO> getIntangibleCulturalHeritageList();

    //增加一个非物质文化遗产
    int addIntangibleCulturalHeritage(ChineseCulturalDO record);

    //删除一个非物质文化遗产
    int removeIntangibleCulturalHeritage(ChineseCulturalDOKey key);

    //修改一个非物质文化遗产
    int updateIntangibleCulturalHeritage(ChineseCulturalDOKey key, ChineseCulturalDO record);

    //修改一个非物质文化遗产状态

}

package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.dto.ExmaineDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTopicDODto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IndustrialDevelopExpertRefDOMapper {

    int deleteByPrimaryKey(IndustrialDevelopExpertRefDOKey key);

    int insert(IndustrialDevelopExpertRefDO record);

    int insertSelective(IndustrialDevelopExpertRefDO record);

    IndustrialDevelopExpertRefDO selectByPrimaryKey(IndustrialDevelopExpertRefDOKey key);

    //查询
    List<String> selectAllTopicCode();

    List<ExmaineDto> selectByExpertCode(String expertCode);
    List<ExmaineDto> selectAllByTopicCode(String topicCode);

    int updateByPrimaryKeySelective(IndustrialDevelopExpertRefDO record);

    int updateByPrimaryKey(IndustrialDevelopExpertRefDO record);

    List<IndustrialDevelopExpertRefDO> selectByTopicCode(String topicCode);

    int deleteByTopicCode(String topicCode);

    List<IndustrialDevelopTopicDODto> topicAndExpertStatus();

    Integer selectZjktsl(String topicCode);

    int delExpertTopic(@Param("expertCode")String expertCode, @Param("topicCode")String topicCode);
}
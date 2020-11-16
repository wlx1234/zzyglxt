package com.zyyglxt.service;

import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.response.ResponseData;

import java.util.List;

/**
 * @Author nongcn
 * @Date 2020/11/14 14:57
 * @Version 1.0
 */
public interface IOrganizationService {

    public List<OrganizationDO> selectAllOrgByAuditStatus1();

    public List<OrganizationDO> selectAllOrgByAuditStatus2();

    public ResponseData orgAudit(OrganizationDO organizationDO);
}

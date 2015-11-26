/*******************************************************************************
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *******************************************************************************/
package com.ilscipio.cato.webapp.ftl;

import java.util.List;

import com.ilscipio.cato.webapp.ftl.CommonFtlUtil.LocalFtlVarHandler;

import freemarker.core.Environment;
import freemarker.template.TemplateModelException;

/**
 * Cato: LocalsPutAllMethod - Freemarker Method for dumping all values in a map
 * into FTL locals.
 */
public class LocalsPutAllMethod extends VarsPutAllMethod {

    public static final String module = LocalsPutAllMethod.class.getName();

    /*
     * @see freemarker.template.TemplateMethodModel#exec(java.util.List)
     */
    @SuppressWarnings("unchecked")
    @Override
    public Object exec(List args) throws TemplateModelException {
        Environment env = FtlTransformUtil.getCurrentEnvironment();
        return execPutAll(args, new LocalFtlVarHandler(env), env);
    }

}
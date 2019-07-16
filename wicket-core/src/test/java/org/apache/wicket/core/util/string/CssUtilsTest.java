/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.wicket.core.util.string;

import org.apache.wicket.response.StringResponse;
import org.junit.Assert;
import org.junit.Test;

import java.util.Collections;

/**
 * @since 1.5.7
 */
public class CssUtilsTest extends Assert
{
	/**
	 * https://issues.apache.org/jira/browse/WICKET-4546
	 *
	 * @throws Exception
	 */
	@Test
	public void writeLink() throws Exception
	{
		StringResponse response = new StringResponse();
		String url = "some/url;jsessionid=1234?with=parameters&p1=v1";
		String media = "some<>media";
		AttributeMap attributes = new AttributeMap();
		attributes.put(CssUtils.ATTR_LINK_REL, "stylesheet");
		attributes.put(CssUtils.ATTR_TYPE, "text/css");
		attributes.put(CssUtils.ATTR_LINK_HREF, url);
		attributes.put(CssUtils.ATTR_LINK_MEDIA, media);
		attributes.put(CssUtils.ATTR_ID, "markupId");
		CssUtils.writeLink(response, attributes);
		assertEquals("<link rel=\"stylesheet\" type=\"text/css\" href=\"some/url;jsessionid=1234?with=parameters&p1=v1\" media=\"some%3C%3Emedia\" id=\"markupId\"/>", response.toString());
	}
}

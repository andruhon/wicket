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
public class JavaScriptUtilsTest extends Assert
{
	/**
	 * https://issues.apache.org/jira/browse/WICKET-4546
	 * 
	 * @throws Exception
	 */
	@Test
	public void writeJavaScript() throws Exception
	{
		AttributeMap attributes = new AttributeMap(Collections.singleton(JavaScriptUtils.ATTR_SCRIPT_SRC));
		attributes.add(JavaScriptUtils.ATTR_TYPE, "text/javascript");
		attributes.add(JavaScriptUtils.ATTR_ID, "some&bad%id");
		attributes.add(JavaScriptUtils.ATTR_SCRIPT_DEFER, "defer");
		attributes.add("charset", "some&bad%%charset");
		attributes.add(JavaScriptUtils.ATTR_SCRIPT_SRC, "some/url;jsessionid=1234?p1=v1&p2=v2");
		StringResponse response = new StringResponse();
		JavaScriptUtils.writeScript(response, attributes);

		assertEquals(
			"<script type=\"text/javascript\" id=\"some&amp;bad%id\" defer=\"defer\" charset=\"some&amp;bad%%charset\" src=\"some/url;jsessionid=1234?p1=v1&p2=v2\"></script>\n",
			response.toString());
	}

	/**
	 * https://issues.apache.org/jira/browse/WICKET-5715
	 */
	@Test
	public void writeJavaScriptAsync()
	{
		AttributeMap attributes = new AttributeMap(Collections.singleton(JavaScriptUtils.ATTR_SCRIPT_SRC));
		attributes.add(JavaScriptUtils.ATTR_TYPE, "text/javascript");
		attributes.add(JavaScriptUtils.ATTR_ID, "some&bad%id");
		attributes.add(JavaScriptUtils.ATTR_SCRIPT_DEFER, "defer");
		attributes.add(JavaScriptUtils.ATTR_SCRIPT_ASYNC, "async");
		attributes.add("charset", "some&bad%%charset");
		attributes.add(JavaScriptUtils.ATTR_SCRIPT_SRC, "some/url;jsessionid=1234?p1=v1&p2=v2");
		StringResponse response = new StringResponse();
		JavaScriptUtils.writeScript(response, attributes);

		assertEquals(
				"<script type=\"text/javascript\" id=\"some&amp;bad%id\" defer=\"defer\" async=\"async\" charset=\"some&amp;bad%%charset\" src=\"some/url;jsessionid=1234?p1=v1&p2=v2\"></script>\n",
				response.toString());
	}

	/**
	 */
	@Test
	public void writeInlineScript()
	{
		StringResponse response = new StringResponse();
		AttributeMap attributes = new AttributeMap();
		attributes.add(JavaScriptUtils.ATTR_TYPE, "text/javascript");
		JavaScriptUtils.writeInlineScript(response,
			"var message = 'Scripts are written to the <script></script> tag'", attributes);

		assertEquals("<script type=\"text/javascript\">\n" //
			+ "/*<![CDATA[*/\n" //
			+ "var message = 'Scripts are written to the <script><\\/script> tag'\n" //
			+ "/*]]>*/\n"//
			+ "</script>\n", response.toString());
	}

	/**
	 */
	@Test
	public void scriptTag()
	{
		assertEquals("<script type=\"text/javascript\">\n/*<![CDATA[*/\n",
			JavaScriptUtils.SCRIPT_OPEN_TAG);
		assertEquals("\n/*]]>*/\n</script>\n", JavaScriptUtils.SCRIPT_CLOSE_TAG);
	}
}

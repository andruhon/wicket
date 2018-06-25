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
package org.apache.wicket.pageStore;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.Serializable;

import org.apache.wicket.MetaDataKey;
import org.apache.wicket.MockPage;
import org.apache.wicket.mock.MockPageStore;
import org.apache.wicket.page.IManageablePage;
import org.junit.Test;

/**
 * Test for {@link GroupingPageStore}.
 * 
 * @author svenmeier
 */
public class GroupingPageStoreTest
{

	private static MetaDataKey<Serializable> KEY = new MetaDataKey<Serializable>()
	{
	}; 
	
	private static Serializable VALUE = new Serializable()
	{
	};

	@Test
	public void test()
	{
		String sessionId = "foo";
		
		IPageStore store = new MockPageStore() {
			
			public void addPage(IPageContext context, IManageablePage page) {

				context.setSessionAttribute("attribute", "value");
				context.setSessionData(KEY, VALUE);

				assertEquals(sessionId + "_" + group(page), context.getSessionId());
				
				super.addPage(context, page);
			}
			
			@Override
			public void removeAllPages(IPageContext context)
			{
				assertEquals(sessionId + "_group0", context.getSessionId());
				
				super.removeAllPages(context);
			}
		};
		
		IPageStore groupingStore = new GroupingPageStore(store, 2) {
			@Override
			protected String getGroup(IManageablePage page)
			{
				return group(page);
			}
		};
		
		DummyPageContext context = new DummyPageContext(sessionId) {
			@Override
			public <T extends Serializable> void setSessionData(MetaDataKey<T> key, T value)
			{
				assertFalse("session not set directly in session", value == VALUE);
				
				super.setSessionData(key, value);
			}
			
			@Override
			public <T extends Serializable> void setSessionAttribute(String key, T value)
			{
				assertTrue("key starts with group", key.startsWith("attribute_group"));
				
				super.setSessionAttribute(key, value);
			}
		};
		
		groupingStore.addPage(context, new MockPage(0));
		groupingStore.addPage(context, new MockPage(1));
		groupingStore.addPage(context, new MockPage(10));
		groupingStore.addPage(context, new MockPage(11));
		groupingStore.addPage(context, new MockPage(2));
		groupingStore.addPage(context, new MockPage(21));
		
	}

	protected String group(IManageablePage page)
	{
		return "group" + page.getPageId() / 10;
	}
}

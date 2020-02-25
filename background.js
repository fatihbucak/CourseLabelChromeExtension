// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {

    chrome.webNavigation.onCompleted.addListener(function() {

        function modifyDOM() {

            var leftSide = document.getElementsByClassName("menuErisimAgaci");
            if (leftSide.length > 0) {
                var scripts = leftSide[0].getElementsByTagName("script");
                var courses = leftSide[0].getElementsByTagName("span");
                for (var i = 0; i < courses.length; i++) {
                    if (scripts[i].innerText.includes("var title")) {
                        var parts = scripts[i].innerText.split(";\">");
                        var courseName = parts[1].split("</span>")[0];
                        if (courseName.length > 25) {
                            courseName = courseName.substring(0, 25)
                        }
                        courses[i].innerHTML = courseName;
                    }
                }
            }

            return document.body.innerHTML;
        }

        chrome.tabs.executeScript({
            code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
        }, (results) => {

        });



    }, {
        url: [{
            urlMatches: 'https://ninova.itu.edu.tr'
        }]
    });
});

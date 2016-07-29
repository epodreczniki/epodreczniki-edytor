<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:cn="http://cnx.rice.edu/cnxml"
    xmlns:ep="http://epodreczniki.pl/"
    xmlns:epe="http://epodreczniki.pl/editor"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:cnxml="http://cnx.rice.edu/cnxml"
    xmlns:md="http://cnx.rice.edu/mdml"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:q="http://cnx.rice.edu/qml/1.0"
    xmlns:bib="http://bibtexml.sf.net/"
    xmlns:mml="http://www.w3.org/1998/Math/MathML"
    xmlns:bibtex="http://bibtexml.sf.net/"
    xmlns="http://www.w3.org/1999/xhtml"
    version="1.0">
    
    <xsl:param name="metadataView" select="'false'"/>
        
    <xsl:template match="cnxml:metadata" mode="metadata">
		<div class="metadata-container">
			<xsl:apply-templates/>
		</div>
    </xsl:template> 
    
    <xsl:template match="*">
		<xsl:element name="div">
            <xsl:attribute name="class">
                <xsl:value-of select="concat(local-name(), ' node-container')"/>
            </xsl:attribute>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-header header')"/>
                </xsl:attribute>
                <xsl:apply-templates select="current()" mode="label"/>
                
				<xsl:if test="local-name()='core-curriculum-entries'">
					<button class="add-curriculum-entry" onclick="openDialog(this, node, 'html-extra/add-curriculum-entry-dialog.html', 'Dodaj podstawe programową')"/>
				</xsl:if>
            </xsl:element>
            <xsl:element name="div">
                <xsl:attribute name="class">
                    <xsl:value-of select="concat(local-name(), '-contents contents')"/>
                </xsl:attribute>
                <xsl:choose>
                    <xsl:when test="local-name()='actors' or local-name()='roles' or local-name()='core-curriculum-entries'">
						<ol>
							<xsl:apply-templates select="node()" mode="listitem"/>
						</ol>
                    </xsl:when>
                    <xsl:when test="local-name()='content-id' or local-name()='repository' or local-name()='version' 
						or local-name()='created' or local-name()='revised' or local-name()='language' or local-name()='license'
						or local-name()='core-curriculum-stage' or local-name()='core-curriculum-subject' or local-name()='core-curriculum-version'
                    ">
						<xsl:value-of select="string(.)"/>
                    </xsl:when>
                    <xsl:when test="local-name()='person'">
						<xsl:apply-templates select="node()"/>
						<xsl:variable name="userid" select="@userid"/>
						<xsl:apply-templates select="../../md:roles/md:role[.=$userid]"/>
					</xsl:when>
					<xsl:when test="local-name()='role'">
						<xsl:value-of select="@type"/>
					</xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="node()"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="ep:core-curriculum-school/text()">
        <xsl:choose>
            <xsl:when test="contains(., 'Szkoły ponadgimnazjalne')">
                <xsl:value-of select="string('Szkoły ponadgimnazjalne')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="string(.)"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
        
    <xsl:template match="ep:core-curriculum-ability/text()">
        <xsl:value-of select="string(.)"/>
    </xsl:template>
    
    <xsl:template match="ep:template/text()">
        <xsl:choose>
            <xsl:when test=".='linear'">
                <xsl:value-of select="string('liniowy')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="string(.)"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="ep:numbering/text()">
        <xsl:choose>
            <xsl:when test=".='skip'">
                <xsl:value-of select="string('pomiń')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="string(.)"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
	<xsl:template match="md:roles"/>
    
    <xsl:template match="ep:origin-id"/>
    
    <xsl:template match="ep:origin-version"/>
	
	<xsl:template match="ep:core-curriculum-entry" mode="label">
	    <xsl:choose>
	        <xsl:when test="./ep:core-curriculum-ability/@ep:key">
	            <xsl:value-of select="string(./ep:core-curriculum-ability/@ep:key)"/>
	        </xsl:when>
	        <xsl:otherwise>Inne - nie powiązane z żadnym punktem podstawy programowej</xsl:otherwise>
	    </xsl:choose>
	    
	</xsl:template>
    
    <xsl:template match="*" mode="listitem">
		<li>
			<xsl:apply-templates select="."/>
		</li>
	</xsl:template>
	
    <xsl:template match="*" mode = "label">
		<xsl:value-of select="local-name()"/>
	</xsl:template>
</xsl:stylesheet>

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:cn="http://cnx.rice.edu/cnxml"
    xmlns:ep="http://epodreczniki.pl/"
    exclude-result-prefixes="xs"
    version="1.0">
    
    <xsl:output indent="yes"/>
    
    <xsl:template match="locales">
        <xsl:element name="xsl:stylesheet">
            <xsl:attribute name="version">1.0</xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="locale">
        
        <xsl:element name="xsl:template">
            <xsl:attribute name="match">
                <xsl:text>*[@*[local-name()='type']='</xsl:text>
                <xsl:value-of select="@key"/>
                <xsl:text>' or local-name()='</xsl:text>
                <xsl:value-of select="@key"/>
                <xsl:text>']</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="mode">label</xsl:attribute>
            

                <xsl:element name="span" namespace="http://www.w3.org/1999/xhtml">
                    <xsl:attribute name="class">label</xsl:attribute>
                    <xsl:element name="xsl:value-of">
                        <xsl:attribute name="select">
                            <xsl:text>'</xsl:text>
                            <xsl:value-of select="."/>
                            <xsl:text>'</xsl:text>
                        </xsl:attribute>
                    </xsl:element>
                </xsl:element>

        </xsl:element>
        
    </xsl:template>
    
</xsl:stylesheet>